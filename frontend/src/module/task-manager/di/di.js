import { axiosInstance } from "@/core/axios";
import { taskController } from "../controller/taskController";

import createTaskRepository from "../data/repository/createTaskRepository";

import updateTaskRepository from "../data/repository/updateTaskRepository";

import saveTaskUseCase from "../domain/usecase/saveTaskUseCase";

import getTaskRepository from "../data/repository/getTaskRepository";
import getTaskUseCase from "../domain/usecase/getTaskUseCase";

import deleteTaskRepository from "../data/repository/deleteTaskRepository";
import deleteTaskUseCase from "../domain/usecase/deleteTaskUseCase";

const getTaskRepositoryImpl = getTaskRepository(axiosInstance);
const getTaskUseCaseImpl = getTaskUseCase(getTaskRepositoryImpl);

const deleteTaskRepositoryImpl = deleteTaskRepository(axiosInstance);
const deleteTaskUseCaseImpl = deleteTaskUseCase(deleteTaskRepositoryImpl);

const createTaskRepositoryImpl = createTaskRepository(axiosInstance);

const updateTaskRepositoryImpl = updateTaskRepository(axiosInstance);

const saveTaskUseCaseImpl = saveTaskUseCase(
  createTaskRepositoryImpl,
  updateTaskRepositoryImpl
);

export const taskControllerImpl = taskController(
  getTaskUseCaseImpl,
  deleteTaskUseCaseImpl,
  saveTaskUseCaseImpl
);
