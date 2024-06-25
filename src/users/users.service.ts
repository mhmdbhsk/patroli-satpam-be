import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createUserDto.image,
      );
      createUserDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        updateUserDto.image,
      );
      updateUserDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
