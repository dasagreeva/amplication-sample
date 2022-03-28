/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateOrganisationArgs } from "./CreateOrganisationArgs";
import { UpdateOrganisationArgs } from "./UpdateOrganisationArgs";
import { DeleteOrganisationArgs } from "./DeleteOrganisationArgs";
import { OrganisationFindManyArgs } from "./OrganisationFindManyArgs";
import { OrganisationFindUniqueArgs } from "./OrganisationFindUniqueArgs";
import { Organisation } from "./Organisation";
import { OrganisationService } from "../organisation.service";

@graphql.Resolver(() => Organisation)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class OrganisationResolverBase {
  constructor(
    protected readonly service: OrganisationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Organisation",
    action: "read",
    possession: "any",
  })
  async _organisationsMeta(
    @graphql.Args() args: OrganisationFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Organisation])
  @nestAccessControl.UseRoles({
    resource: "Organisation",
    action: "read",
    possession: "any",
  })
  async organisations(
    @graphql.Args() args: OrganisationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Organisation[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Organisation",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Organisation, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Organisation",
    action: "read",
    possession: "own",
  })
  async organisation(
    @graphql.Args() args: OrganisationFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Organisation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Organisation",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Organisation)
  @nestAccessControl.UseRoles({
    resource: "Organisation",
    action: "create",
    possession: "any",
  })
  async createOrganisation(
    @graphql.Args() args: CreateOrganisationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Organisation> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Organisation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Organisation"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Organisation)
  @nestAccessControl.UseRoles({
    resource: "Organisation",
    action: "update",
    possession: "any",
  })
  async updateOrganisation(
    @graphql.Args() args: UpdateOrganisationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Organisation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Organisation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Organisation"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Organisation)
  @nestAccessControl.UseRoles({
    resource: "Organisation",
    action: "delete",
    possession: "any",
  })
  async deleteOrganisation(
    @graphql.Args() args: DeleteOrganisationArgs
  ): Promise<Organisation | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
