import { Request, Response } from "express";
import { TCreateSchedule } from "../../interfaces/schedule.interfaces";
import { createScheduleService } from "../../services/schedule/createSchedule.service";
import { RealEstate } from "../../entities";
import { getAllSchedulesService } from "../../services/schedule/getAllSchedules.service";

const createScheduleController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const scheduleData: TCreateSchedule = req.body;
    const userId: number = Number(req.user.id);

    await createScheduleService(scheduleData, userId);

    return res.status(201).json({ message: "Schedule created" });
};

const getAllSchedulesController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const realEstateID: number = Number(req.params.id);
    const schedules: RealEstate = await getAllSchedulesService(realEstateID);

    return res.status(200).json(schedules);
};
export { createScheduleController, getAllSchedulesController };
