"use client";

import { ManageSlots } from '@/components/modules/Tutor/TutorSlotsManager';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getMyProfile } from '@/services/TutorProfile.service';

export default function ManageSlotsPage() {
    const [tutorId, setTutorId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await getMyProfile();
                if (res?.data?.id) {
                    setTutorId(res.data.id);
                }
            } catch (error) {
                console.error("Profile load failed", error);
            } finally {
                setIsLoading(false);
            }
        };
        getProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            </div>
        );
    }

    if (!tutorId) {
        return (
            <div className="text-center mt-20">
                <p className="text-slate-500 font-bold uppercase tracking-widest">
                    Tutor profile not found. Please create a profile first.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
         
            <ManageSlots tutorId={tutorId} />
        </div>
    );
}