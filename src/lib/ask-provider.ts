import type { Meeting } from './types';

export type AskAnswer = { title: string; answer: string; citations: { label: string; time: number }[] };

const atlasAnswers: Record<string, AskAnswer> = {
  decisions: { title: 'Decisions made', answer: 'The team approved a September 24 private beta for 20 customer teams, conditional on the final permissions and accessibility acceptance checks. They also agreed to ship title and transcript search with direct links to the supporting moment.', citations: [{ label: 'Beta launch decision', time: 594 }, { label: 'Search decision', time: 270 }] },
  risks: { title: 'Biggest launch risks', answer: 'Permissions and public-link isolation are the remaining product risks. The team also called out long-meeting performance, keyboard access, and reliable save-state feedback as conditions for a confident release.', citations: [{ label: 'Permission risk', time: 54 }, { label: 'Long-meeting acceptance', time: 378 }, { label: 'Save-state reliability', time: 432 }] },
  launch: { title: 'Launch date', answer: 'The private beta is scheduled for September 24. Sophie will prepare invitations for the 20 approved teams, but sending is held until Maya confirms that acceptance testing is green.', citations: [{ label: 'Launch decision', time: 594 }, { label: 'Invitation condition', time: 756 }] },
  noah: { title: 'Noah’s follow-up', answer: 'Noah owns the long-meeting, keyboard, narrow-screen, and fresh-browser public-link acceptance pass. He will link each finding back to a recording timestamp.', citations: [{ label: 'Acceptance scope', time: 378 }, { label: 'Named owner', time: 702 }] },
};

export const suggestedQuestions = [
  { id: 'decisions', label: 'What decisions were made?' },
  { id: 'risks', label: 'What are the biggest launch risks?' },
  { id: 'launch', label: 'What did the team decide about the launch date?' },
  { id: 'noah', label: 'What does Noah need to follow up on?' },
];

export function answerQuestion(meeting: Meeting, question: string): AskAnswer {
  const normalized = question.toLowerCase();
  if (meeting.id === 'atlas-launch') {
    if (normalized.includes('noah')) return atlasAnswers.noah;
    if (normalized.includes('risk')) return atlasAnswers.risks;
    if (normalized.includes('launch') || normalized.includes('date')) return atlasAnswers.launch;
    if (normalized.includes('decision')) return atlasAnswers.decisions;
  }
  return { title: 'Meeting answer', answer: `This meeting focused on ${meeting.description.toLowerCase()} The summary identifies the key decisions and follow-up work for the team.`, citations: meeting.summary.takeaways.slice(0, 2).map(point => ({ label: point.text, time: point.time })) };
}
