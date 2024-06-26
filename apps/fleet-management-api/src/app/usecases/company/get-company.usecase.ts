import { CompanyRepository } from '@app/repositories/company.repository';
import { Injectable } from '@nestjs/common';

interface ListCompanyQueryParams {
  cnpj?: string;
  socialName?: string;
  offset?: string;
  page?: string;
}

@Injectable()
export class ListCompany {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(queryParams?: ListCompanyQueryParams) {
    const companies = await this.companyRepository.getCompanies({
      searchParams: queryParams,
    });

    return companies;
  }
}
