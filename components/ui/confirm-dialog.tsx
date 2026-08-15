'use client';

import { AlertTriangle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmLabel?: string;
    onConfirm: () => void;
    isPending?: boolean;
    destructive?: boolean;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    onConfirm,
    isPending,
    destructive = true
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                destructive ? 'bg-fall/10 text-fall' : 'bg-brand/10 text-brand'
                            }`}
                        >
                            <AlertTriangle className="w-4.5 h-4.5" />
                        </div>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">{description}</p>

                <div className="flex gap-2 pt-2">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 rounded-md bg-surface-raised px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        disabled={isPending}
                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-60 ${
                            destructive ? 'bg-fall hover:bg-fall/90' : 'bg-brand hover:bg-brand-hover'
                        }`}
                    >
                        {isPending ? 'Please wait...' : confirmLabel}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}