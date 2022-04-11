import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { UserReferenceDto } from "src/user/dto/user-reference.dto";
import { CommunityService } from "./community.service";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";

@Controller('community')
export class CommunityController {
    constructor(private readonly communityService: CommunityService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Req() request: Request, @Body() createCommunityDto: CreateCommunityDto) {
        return this.communityService.create(createCommunityDto, request.user);
    }

    @Get()
    findAll() {
        return this.communityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.communityService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Req() request: Request, @Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
        return this.communityService.update(+id, updateCommunityDto, request.user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Req() request: Request,@Param('id') id: string) {
        return this.communityService.remove(+id, request.user);
    }

    @Post(':id/add-user')
    @UseGuards(AuthGuard('jwt'))
    addUser(@Req() request: Request, @Param('id') id: string, @Body() userReferenceDto: UserReferenceDto) {
        return this.communityService.addUser(+id, userReferenceDto, request.user);
    }

    @Post(':id/remove-user')
    @UseGuards(AuthGuard('jwt'))
    removeUser(@Req() request: Request, @Param('id') id: string, @Body() userReferenceDto: UserReferenceDto) {
        return this.communityService.removeUser(+id, userReferenceDto, request.user);
    }

    @Get(':id/members')
    @UseGuards(AuthGuard('jwt'))
    members(@Param('id') id: string) {
        return this.communityService.members(+id);
    }
}