
UPDATE account.user SET
    password=$2

WHERE
    id=$1

RETURNING
    id,
    client_id,
    first_name,
    last_name,
    email,
    username,
    password,
    is_disabled,
    disabled_comment;