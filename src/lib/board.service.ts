import { z, ZodError } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';

const BoardSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.object({
    projectId: z.number(),
    avatarURI: z.string(),
    name: z.string(),
  }),
});

export type Board = z.infer<typeof BoardSchema>;

const BoardListSchema = z.object({
  maxResults: z.number(),
  startAt: z.number(),
  total: z.number(),
  isLast: z.boolean(),
  values: z.array(BoardSchema),
});

async function filterBoards(boards: Board[]): Promise<Board[]> {
  const scrumBoards: Board[] = [];
  for (const board of boards) {
    if (await isBoardScrum(board.id)) {
      scrumBoards.push(board);
    }
  }
  return scrumBoards;
}

async function isBoardScrum(boardId: number): Promise<boolean> {
  try {
    await getBoardConfiguration(boardId);
    return true;
  } catch (error) {
    if (!(error instanceof ZodError)) {
      throw error;
    }
    return false;
  }
}

export async function getBoards(): Promise<Board[]> {
  const response = await callApi(`/rest/agile/1.0/board/`);

  const { values } = validateData(BoardListSchema, response);

  return filterBoards(values);
}

const BoardConfigurationSchema = z.object({
  estimation: z.object({
    type: z.string(),
    field: z.object({
      fieldId: z.string(),
      displayName: z.string(),
    }),
  }),
});

type BoardConfiguration = z.infer<typeof BoardConfigurationSchema>;

export async function getBoardConfiguration(boardId: number | string): Promise<BoardConfiguration> {
  const response = await callApi(`/rest/agile/1.0/board/${boardId}/configuration`);

  return validateData(BoardConfigurationSchema, response);
}
