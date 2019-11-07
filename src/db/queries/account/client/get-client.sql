
SELECT
	  C.id
	, C.name
	, C.slug
	, C.owner_id
	, C.is_disabled
	, C.disabled_comment
	, COALESCE(json_agg(T.name) FILTER (WHERE T.name IS NOT NULL), '[]'::json) AS types
	
FROM
	account.client AS C
	
LEFT JOIN LATERAL(
	SELECT
		  AT.name
		, CT.client_id
	FROM
		account.client_type AS CT
	
	LEFT JOIN
		account.type AS AT ON AT.id=CT.type_id
	
	WHERE
		CT.client_id=C.id
) AS T ON T.client_id=C.id

GROUP BY C.id;