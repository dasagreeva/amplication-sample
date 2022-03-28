/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "nestjs-prisma";
import { Prisma, Organisation } from "@prisma/client";

export class OrganisationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.OrganisationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganisationFindManyArgs>
  ): Promise<number> {
    return this.prisma.organisation.count(args);
  }

  async findMany<T extends Prisma.OrganisationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganisationFindManyArgs>
  ): Promise<Organisation[]> {
    return this.prisma.organisation.findMany(args);
  }
  async findOne<T extends Prisma.OrganisationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganisationFindUniqueArgs>
  ): Promise<Organisation | null> {
    return this.prisma.organisation.findUnique(args);
  }
  async create<T extends Prisma.OrganisationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganisationCreateArgs>
  ): Promise<Organisation> {
    return this.prisma.organisation.create<T>(args);
  }
  async update<T extends Prisma.OrganisationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganisationUpdateArgs>
  ): Promise<Organisation> {
    return this.prisma.organisation.update<T>(args);
  }
  async delete<T extends Prisma.OrganisationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganisationDeleteArgs>
  ): Promise<Organisation> {
    return this.prisma.organisation.delete(args);
  }
}
