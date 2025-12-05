"use client";

import { SellerTab } from "@/components/siarnaq/admin/sellerProducts/SellerTab";
import { UserSearch } from "@/components/siarnaq/admin/userSearch/UserSearch";
import { useCoreUser } from "@/hooks/siarnaq/useCoreUser";
import { useSellers } from "@/hooks/siarnaq/useSellers";
import { useStatus } from "@/hooks/siarnaq/useStatus";
import { useRouter } from "@/i18n/navigation";
import { useSizeStore } from "@/stores/SizeStore";

import { Suspense, useEffect } from "react";

import { Card } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const AdminPage = () => {
  const { setSize, size } = useSizeStore();
  const { user, isAdmin } = useCoreUser();
  const { sellers } = useSellers();
  const router = useRouter();
  const { status } = useStatus();

  useEffect(() => {
    if (!user) return;
    const userGroups = user.groups?.map((group) => group.id);
    const isUserInASellerGroup = userGroups?.some((group) =>
      sellers.some((seller) => seller.group_id === group)
    );
    if (!isAdmin && !isUserInASellerGroup) {
      router.push("/");
    }
  }, [isAdmin, router, sellers, user]);

  useEffect(() => {
    if (status?.status) {
      if (status.status === "onsite") {
        setSize(50);
      } else {
        setSize(100);
      }
    }
  }, [status, setSize]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 min-h-[--custom-vh] pb-8 bg-muted/40">
      <Suspense fallback={<div>Loading...</div>}>
        {status && (
          <Card>
            {status.status === "onsite" ||
            (isAdmin && status.status === "online") ? (
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={100 - size} minSize={10}>
                  <UserSearch />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                  defaultSize={size}
                  minSize={10}
                  onResize={setSize}
                >
                  <SellerTab status={status} />
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <SellerTab status={status} />
            )}
          </Card>
        )}
      </Suspense>
    </main>
  );
};

export default AdminPage;
