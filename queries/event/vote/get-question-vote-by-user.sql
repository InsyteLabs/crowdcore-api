
SELECT
    id,
    event_id,
    question_id,
    user_id,
    value

FROM
    event.vote

WHERE
        question_id=$1
    AND user_id=$2;