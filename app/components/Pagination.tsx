'use client'

import React, { JSX } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

    const renderPaginationButtons = () => {
        const buttons: JSX.Element[] = [];

        buttons.push(
            <Button
                key="prev"
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Ir a la página anterior"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
        );

        let startPage: number;
        let endPage: number;

        if (totalPages <= 7) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 4) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage >= totalPages - 3) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        if (startPage > 1) {
            buttons.push(
                <Button key={1} variant={"outline"} size="icon" onClick={() => onPageChange(1)}>1</Button>
            );
            if (startPage > 2) {
                buttons.push(
                    <Button key="dots1" variant="ghost" size="icon" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button key={i} variant={currentPage === i ? "default" : "outline"} size="icon" onClick={() => onPageChange(i)}>
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <Button key="dots2" variant="ghost" size="icon" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                );
            }
            buttons.push(
                <Button key={totalPages} variant={"outline"} size="icon" onClick={() => onPageChange(totalPages)}>
                    {totalPages}
                </Button>
            );
        }

        buttons.push(
            <Button
                key="next"
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to the next page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        );

        return buttons;
    };

    return (
        <nav aria-label="Pagination">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {renderPaginationButtons()}
            </div>
        </nav>
    );
};

export default Pagination;
