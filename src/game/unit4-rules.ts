import { shuffled, type Question } from './adventure';

/**
 * Spot the Difference: the sentence describes one of two pictures.
 *
 * `photo` is always the picture that matches the sentence and `afterPhoto` is the other
 * one. The component shuffles which one sits on the left, so a child cannot learn to
 * always tap the same side, and correctness is judged on the picture they tapped.
 */
export function spotCorrect(q: Question, tappedPhoto: string): boolean {
  return tappedPhoto === q.photo;
}

export type SpotSide = { photo: string; label: 'A' | 'B' };

/** The two pictures in display order. Labels are positional: A is always on the left. */
export function spotSides(q: Question, random: () => number = Math.random): SpotSide[] {
  const photos = shuffled([q.photo ?? '', q.afterPhoto ?? ''], random);
  return photos.map((photo, i) => ({ photo, label: i === 0 ? 'A' : 'B' }));
}

/** The matching description, used for the feedback line after a correct answer. */
export const spotAnswer = (q: Question) => q.answer[0] ?? '';
