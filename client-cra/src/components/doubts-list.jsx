/* eslint-disable react/prop-types */

import { DoubtCard } from "./doubt-card";

export const DoubtsList = ({ doubts }) => {
  return (
    <>
      {Array.isArray(doubts)
        ? doubts.map((doubt) => (
            <DoubtCard
              key={doubt.id}
              content={doubt.content}
              created_by={doubt.created_by}
              id={doubt.id}
              resolved={doubt.resolved}
              subject={doubt.subject}
              tutored_by={doubt.tutored_by}
            />
          ))
        : null}
    </>
  );
};
