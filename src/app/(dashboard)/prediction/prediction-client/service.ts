import { Board } from '@/lib/board.service';
import { getIssuesWithChangelog } from '@/lib/issue/issue.service';
import { getSchedules } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { getInProgressStatuses } from '@/lib/project.service';
import { getTimeInProgress } from '@/lib/issue/issue-time-spent.service';

async function getIssuesWithTimeSpent(board: Board, accessToken: string, cloudId: string) {
  const issues = await getIssuesWithChangelog(board.id, accessToken, cloudId);

  const schedules = await getSchedules(accessToken, cloudId);

  const inProgressColumns = await getInProgressStatuses(
    board.location.projectId,
    accessToken,
    cloudId
  );

  return issues.map((issue) => ({
    ...issue,
    timeSpent: getTimeInProgress(issue, schedules, inProgressColumns),
  }));
}

export async function sendIssues(board: Board, accessToken: string, cloudId: string) {}
