import { Request, Response } from "express";
import { TCreateSchedule } from "../../interfaces/schedule.interfaces";
import { createScheduleService } from "../../services/schedule/createSchedule.service";

const createScheduleController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const scheduleData: TCreateSchedule = req.body;
    const userId: number = Number(req.user.id);

    await createScheduleService(scheduleData, userId);

    return res.status(201).json({ message: "Schedule created" });
};

export { createScheduleController };
