import { Injectable } from '@nestjs/common';
import { CourseDto } from './dto/CourseDto';

@Injectable()
export class CourseService {
  private readonly courses: CourseDto[] = [];

  create(course: CourseDto) {
    this.courses.push(course);
  }

  findAll(): CourseDto[] {
    return this.courses;
  }
}