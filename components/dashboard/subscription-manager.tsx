"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, XCircle } from "lucide-react";

export function SubscriptionManager() {
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("email_subscriptions")
        .select("subscribed_to_announcements")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setSubscribed(data.subscribed_to_announcements);
      }
      setLoading(false);
    };

    fetchSubscription();
  }, [supabase]);

  const handleToggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newValue = !subscribed;

    const { error } = await supabase
      .from("email_subscriptions")
      .update({ subscribed_to_announcements: newValue })
      .eq("user_id", user.id);

    if (!error) {
      setSubscribed(newValue);
    }
  };

  if (loading) {
    return <div className="text-djkn-600">Memuat...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-djkn-100 rounded-lg">
          <Mail className="h-6 w-6 text-djkn-700" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-djkn-900 mb-1">
            Notifikasi Pengumuman
          </h3>
          <p className="text-djkn-600 text-sm mb-3">
            Terima email saat ada pengumuman baru dari PPL
          </p>
          <div className="flex items-center gap-3">
            {subscribed ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  Berlangganan
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-djkn-400" />
                <span className="text-sm text-djkn-500">
                  Tidak berlangganan
                </span>
              </>
            )}
            <Button
              onClick={handleToggle}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              {subscribed ? "Berhenti" : "Berlangganan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}