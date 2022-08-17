import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        
        const board: Board = {
            id: uuid(),
            title,   // title: title,
            description, // description: description,
            status: BoardStatus.PUBLIC
        }
        this.boards.push(board);    // Board[]배열에 새로운 board 객체 추가
        return board;
    }

    getBoardById(id: string): Board {
        // boards 배열 안의 각 board 객체들의 id === 파라미터로 전달받은 id인 board 객체를 찾아서 리턴하라
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        // boards 배열 안의 각 board 객체들의 id === 파라미터로 전달받은 id 일 경우 해당 board 객체를 삭제한 배열을 새로 boards에 할당해라
        this.boards = this.boards.filter((board) => board.id != id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);    // 특정 id를 가진 board를 getBoardById 메서드로 찾아서 board 객체에 바인딩
        board.status = status;  // 파라미터로 전달받은 status를 할당해줌
        return board;   // Board 타입의 board 객체 리턴
    }
}
