import { axiosInstance } from "@/core/axios";
import { taskController } from "../controller/taskController";

import getTaskRepository from "../data/repository/getTaskRepository";
import getTaskUseCase from "../domain/usecase/getTaskUseCase";

const getTaskRepositoryImpl = getTaskRepository(axiosInstance);
const getTaskUseCaseImpl = getTaskUseCase(getTaskRepositoryImpl);

export const taskControllerImpl = taskController(getTaskUseCaseImpl);
