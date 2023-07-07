import { Prisma } from "@prisma/client";

export type Scores = Omit<
  Required<Prisma.usersCreateInput>,
  "id" | "userId" | "serverId" | "username" | "total"
>;
