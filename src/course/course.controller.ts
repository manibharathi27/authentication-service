import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CourseDto } from './dto/CourseDto';
import { CourseService } from './Course.service';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Post()
    create(@Body() course:CourseDto) {
      return this.courseService.create(course);
    }
  
    @Get()
    findAll() {
        return this.courseService.findAll();
    }
  
    @Get(':id')
    findById(@Param('id') id: string) {
      return `This action returns #${id}`;
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() course: CourseDto) {
      return `This action updates #${id}`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `This action removes a #${id}`;
    }
}