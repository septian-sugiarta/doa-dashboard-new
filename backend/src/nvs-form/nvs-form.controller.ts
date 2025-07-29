import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { NvsFormService } from './nvs-form.service';

@Controller('nvs-form')
export class NvsFormController {
  constructor(private readonly nvsFormService: NvsFormService) {}

  @Post(':ncrId')
  create(@Param('ncrId') ncrId: number, @Body() dto: any) {
    return this.nvsFormService.create(+ncrId, dto);
  }

  @Get(':ncrId')
  findByNcrId(@Param('ncrId') ncrId: number) {
    return this.nvsFormService.findByNcrId(+ncrId);
  }
}