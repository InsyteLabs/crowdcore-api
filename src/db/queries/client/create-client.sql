
INSERT INTO account.client
(
    name,
    slug,
    owner_id
)

VALUES
(
    $1,
    $2,
    $3
)

RETURNING *;