create view get_authors as
select
  *
from authors
left join auth.users
on authors.id = auth.users.id;