import { Router } from "express";
import { getAllCourses,getLecturesByCourseId,createCourse,updateCourse,removeCourse,addLecturesToCourseId, removeLecture } from "../controllers/course.controller.js";
import {isLoggedIn,  authorizedRoles, authorizedSubsriber } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router =  Router();

router.route('/')
      .get(getAllCourses)
      .post(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        upload.single('thumbnail'),
        createCourse
        );
router.route('/:id')
      .get( isLoggedIn,authorizedSubsriber,getLecturesByCourseId)
      .put(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        updateCourse
        )
      .delete(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        removeCourse
        )
      .post(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        upload.single("lecture"),
        addLecturesToCourseId
      )
router.put("/lectures/:id", isLoggedIn,authorizedRoles("ADMIN"),removeLecture)

export default router;