import { Company } from '@app/entities/company';
import {
  CompanyListQueryParams,
  CompanyRepository,
} from '@app/repositories/company.repository';

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = [];

  async create(company: Company): Promise<void> {
    this.companies.push(company);
  }

  async findById(id: string): Promise<Company> {
    const company = this.companies.find((c) => c.id === id);

    return company;
  }

  async insertEmployee(userId: string, companyId: string): Promise<void> {
    throw new Error('Not implemented yet');
  }

  async list(params: CompanyListQueryParams): Promise<Company[]> {
    return this.companies.filter((c) => {
      if (c.cnpj === params.searchParams.cnpj) return true;
      if (c.socialName === params.searchParams.socialName) return true;
      return true;
    });
  }
}