import { CreateCompany } from '@app/usecases/company/add-company.usecase';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { ListCompany } from '@app/usecases/company/get-company.usecase';
import { CompanyViewModel } from '../view-model/company.view-model';
import { ListCompanyDTO } from '../dtos/list-company.dto';
import { JwtAuthGuard } from '@infra/authentication/guards/auth.guard';
import { FindCompanyById } from '@app/usecases/company/get-company-by-id.usecase';
import { RolesGuard } from '@infra/authentication/guards/role.guard';
import { Roles } from '@utils/decorator/role.decorator';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private createCompany: CreateCompany,
    private listCompany: ListCompany,
    private findCompanyById: FindCompanyById,
  ) {}

  @Post()
  addCompany(@Body() data: CreateCompanyDTO) {
    return this.createCompany.execute(data);
  }

  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  @Get()
  async getCompanies(@Query() queryParams: ListCompanyDTO) {
    const companies = await this.listCompany.execute({
      socialName: queryParams?.socialName,
      cnpj: queryParams?.cnpj,
    });

    return companies.map(CompanyViewModel.toHttp);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const company = await this.findCompanyById.execute({ id });

    return CompanyViewModel.toHttp(company);
  }
}
