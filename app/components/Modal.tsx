'use client'
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className="relative mx-4 w-full max-w-2xl rounded-lg bg-gray-800 border border-gray-700 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {children}
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default Modal;