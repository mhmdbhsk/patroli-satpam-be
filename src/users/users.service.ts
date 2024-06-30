import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

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

    const email = createUserDto.email;
    const password = createUserDto.password;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const exist = await this.prisma.user.findUnique({ where: { email } });

    if (exist)
      throw new HttpException(
        'User with this email already exists.',
        HttpStatus.CONFLICT,
      );

    createUserDto.password = hashedPassword;

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
    const response = this.prisma.user.findMany();

    response.then((users) => {
      users.map((user) => {
        delete user.password;
      });
    });

    return response;
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
