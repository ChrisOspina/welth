import React from "react";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getUserAccounts } from "@/actions/dashboard";

const DashboardPage = async () => {
  const accounts = await getUserAccounts();

  return (
    <div className="px-5">
      {/* Budget Process */}
      {/* Overview */}
      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card
            className={
              "hover:shadow-md transition-shadow cursor-pointer border-dashed w-full"
            }
          >
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="mb-2 h-10 w-10" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => {
            return account.name;
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
