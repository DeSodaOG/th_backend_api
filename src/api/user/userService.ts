import { StatusCodes } from "http-status-codes";
import { Connection } from 'mysql2/promise';

import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { verifySig } from "@/common/utils/chainHandlers";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Retrieves all users from the database
  async getAllUsers(): Promise<ServiceResponse<any[] | null>> {
    try {
      const users = await this.userRepository.findAllAsync();
      if (!users || users.length === 0) {
        return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success("Users found", users);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single user by their ID
  async getUserByID(id: string): Promise<ServiceResponse<any | null>> {
    try {
      const user = await this.userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Retrieves a single user by their ID
  async getUserAffiliateByID(id: string): Promise<ServiceResponse<User[] | null>> {
    try {
      const user = await this.userRepository.findAffiliateByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User[]>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Retrieves a single user by their ID
  async createNewUser(
    id: string,
    tgHandle: string,
    referrerID: string,
    sig: string
  ): Promise<ServiceResponse<User | null>> {
    try {
      const isPaid = verifySig(id + tgHandle + referrerID, sig);

      let parentReferrerID = "0";
      if (isPaid) {
        const user = await this.userRepository.findByIdAsync(id);
        if (!user) {
          const createdAt = new Date();
          const updatedAt = createdAt;
          console.log(referrerID)
          if (referrerID != '0') {
            const referrerUser = await this.userRepository.findByIdAsync(referrerID);
            console.log(referrerUser)
            parentReferrerID = referrerUser?.referrerid ?? "0";
            if (!referrerUser) {
              return ServiceResponse.failure("Invalid referrer", null, StatusCodes.FORBIDDEN);
            } else {

              const affiliateAmount = referrerUser?.affiliateamount ?? 0;
              const newReferrerScore = referrerUser.score + 20000;
              await this.userRepository.updateReferrerAffiliate(referrerID, affiliateAmount + 1, updatedAt, newReferrerScore);

              if (parentReferrerID != "0") {
                const parentReferrerUser = await this.userRepository.findByIdAsync(parentReferrerID);
                const subAffiliateAmount = parentReferrerUser?.subaffiliateamount ?? 0;
                const newParentReferrerScore = (parentReferrerUser?.score ?? 0) + 40000;
                await this.userRepository.updateParentReferrerAffiliate(parentReferrerID, subAffiliateAmount + 1, updatedAt, newParentReferrerScore)
              }
            }
          }

          await this.userRepository.createNewUser(
            id,
            referrerID,
            parentReferrerID,
            0,
            0,
            createdAt,
            updatedAt,
            tgHandle
          );
          return ServiceResponse.success<null>("User joined successful", null);
        }
        return ServiceResponse.failure("User already joined", null, StatusCodes.FORBIDDEN);
      } else {
        return ServiceResponse.failure("User rejected", null, StatusCodes.FORBIDDEN);
      }

    } catch (ex) {
      const errorMessage = `Error creating new user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while create new user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
