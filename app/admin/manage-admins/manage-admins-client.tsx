"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, User, UserPlus, UserMinus } from "lucide-react";
import { promoteToAdmin, demoteToUser } from "@/lib/services/admin-management";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Toast } from "@/components/ui/toast";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface ManageAdminsClientProps {
  users: User[];
  currentUserId: string;
}

export function ManageAdminsClient({ users, currentUserId }: ManageAdminsClientProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    userId: string;
    action: "promote" | "demote";
    email: string;
  }>({
    isOpen: false,
    userId: "",
    action: "promote",
    email: "",
  });
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleAction = (userId: string, action: "promote" | "demote", email: string) => {
    setConfirmDialog({ isOpen: true, userId, action, email });
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        if (confirmDialog.action === "promote") {
          await promoteToAdmin(confirmDialog.userId);
          setToast({ message: "User berhasil dipromote menjadi admin", type: "success" });
        } else {
          await demoteToUser(confirmDialog.userId);
          setToast({ message: "Admin berhasil didemote menjadi user", type: "success" });
        }
      } catch (error) {
        setToast({
          message: error instanceof Error ? error.message : "Gagal melakukan aksi",
          type: "error",
        });
      } finally {
        setConfirmDialog({ isOpen: false, userId: "", action: "promote", email: "" });
      }
    });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.action === "promote" ? "Promote ke Admin" : "Demote ke User"}
        description={
          confirmDialog.action === "promote"
            ? `Apakah Anda yakin ingin mempromote ${confirmDialog.email} menjadi admin?`
            : `Apakah Anda yakin ingin mendemote ${confirmDialog.email} menjadi user?`
        }
        confirmLabel="Konfirmasi"
        cancelLabel="Batal"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, userId: "", action: "promote", email: "" })}
        variant={confirmDialog.action === "demote" ? "destructive" : "default"}
      />

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border border-djkn-200 rounded-lg hover:bg-djkn-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${user.role === "admin" ? "bg-djkn-100" : "bg-djkn-50"}`}>
                {user.role === "admin" ? (
                  <Shield className="h-5 w-5 text-djkn-700" />
                ) : (
                  <User className="h-5 w-5 text-djkn-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-djkn-900">{user.email}</p>
                <p className="text-xs text-djkn-500">
                  Bergabung: {new Date(user.created_at).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                className={
                  user.role === "admin"
                    ? "bg-djkn-700 text-white"
                    : "bg-djkn-100 text-djkn-700 border-0"
                }
              >
                {user.role === "admin" ? "Admin" : "User"}
              </Badge>

              {user.id !== currentUserId && (
                <Button
                  onClick={() =>
                    handleAction(
                      user.id,
                      user.role === "admin" ? "demote" : "promote",
                      user.email
                    )
                  }
                  variant={user.role === "admin" ? "destructive" : "default"}
                  size="sm"
                  disabled={isPending}
                >
                  {user.role === "admin" ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-1" />
                      Demote
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-1" />
                      Promote
                    </>
                  )}
                </Button>
              )}

              {user.id === currentUserId && (
                <span className="text-xs text-djkn-500 italic">Anda</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}