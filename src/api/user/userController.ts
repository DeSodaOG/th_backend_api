import type { Request, RequestHandler, Response } from "express";
import mysql, { Connection } from 'mysql2/promise';
import { UserService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { databaseConfig } from "@/config";


class UserController {
  public getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
    const userService = new UserService();
    const serviceResponse = await userService.getAllUsers();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUserByID: RequestHandler = async (req: Request, res: Response) => {
    const userService = new UserService();
    const serviceResponse = await userService.getUserByID(req.params.id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getUserAffiliatesByID: RequestHandler = async (req: Request, res: Response) => {
    const userService = new UserService();
    const serviceResponse = await userService.getUserAffiliateByID(req.params.id);
    return handleServiceResponse(serviceResponse, res);
  };

  public createNewUser: RequestHandler = async (req: Request, res: Response) => {
    const userService = new UserService();

    const serviceResponse = await userService.createNewUser(
      req.body.id,
      req.body.tgHandle,
      req.body.referrerID,
    );

    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
