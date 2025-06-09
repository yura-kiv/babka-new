import { DoorState } from "@/components/shared/DoorGrid";
import type { GameState, RowNumber } from "@/types";
import { CellTypeBackend, GameStatusFront } from "@/types";

const OPEN_TYPES: Record<CellTypeBackend, DoorState> = {
    [CellTypeBackend.BOMB]: DoorState.BOMB,
    [CellTypeBackend.PRIZE]: DoorState.PRIZE,
    [CellTypeBackend.EMPTY]: DoorState.OPEN,
};

export const getDoorState = (game: GameState, rowIdx: RowNumber, cellId: number): DoorState => {
    const { openedCells, activeRow } = game;

    const openType = openedCells[rowIdx]?.find((cell) => cell.id === cellId)?.type;

    if (game.status === GameStatusFront.INITIAL) return DoorState.LOCKED;
    if (activeRow === null || activeRow < rowIdx) return DoorState.LOCKED;
    if (activeRow >= rowIdx) return openType ? OPEN_TYPES[openType] : DoorState.CLOSED;

    return DoorState.CLOSED;
};
