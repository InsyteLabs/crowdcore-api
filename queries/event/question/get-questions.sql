
SELECT
	  Q.id
	, Q.event_id
	, Q.user_id
	, Q.text
	, Q.hidden
    
	, U.id           AS user_id
	, U.first_name   AS user_first_name
	, U.last_name    AS user_last_name
	, U.username     AS user_username
	, U.is_anonymous AS user_is_anonymous
	
	, COUNT(CASE WHEN V.value=1  THEN 1 ELSE NULL END)::integer           AS upvotes
	, COUNT(CASE WHEN V.value=-1 THEN 1 ELSE NULL END)::integer           AS downvotes
	, COUNT(CASE WHEN V.value IS NOT NULL THEN 1 ELSE NULL END):: integer AS votes
    , COALESCE(SUM(V.value), 0)::integer                                  AS score
    , SUM(CASE WHEN V.user_id=$1 THEN V.value ELSE 0 END)::integer        AS user_vote
	, $1                                                                  AS vote_requester

	, Q.moderator_response
	, M.id                  AS moderator_id
	, M.first_name          AS moderator_first_name
	, M.last_name           AS moderator_last_name
	, M.username            AS moderator_username
	, M.is_anonymous        AS moderator_is_anonymous

FROM
    event.question AS Q

LEFT JOIN account.user AS U ON U.id=Q.user_id
LEFT JOIN account.user AS M ON M.id=Q.moderator_id
LEFT JOIN event.vote   AS V ON V.question_id=Q.id

GROUP BY
	  Q.id
	, U.id
	, M.id;