import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UserRole } from '@prisma/client';

type PayloadProps = {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: PayloadProps) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        Company: {
          select: {
            id: true,
            Billing: {
              where: {
                dueIn: {
                  gt: new Date(),
                },
              },
              select: {
                id: true,
                status: true,
                dueIn: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não autorizado');
    }

    // if (payload.companyId) {
    //   const company = user.Company.find((c) => c.id === payload.companyId);

    //   if (company && !company.Billing.length) {
    //     throw new UnauthorizedException('Assinatura expirada');
    //   }
    // }

    // if (!user.Company[0].Billing.length) {
    //   throw new UnauthorizedException('Assinatura expirada');
    // }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.Company[0]?.id,
    };
  }

  private static extractJWT(req: Request) {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies['token'];
    }

    return null;
  }
}
