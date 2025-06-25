create function public.user_to_author_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.raw_app_meta_data is not null then
    if new.raw_app_meta_data ? 'provider' and new.raw_app_meta_data ->> 'provider' = 'email' then
      insert into public.authors (
        author_id,
        name,
        username,
        role
      )
      values (
        new.id,
        'TestName',
        'TestUsername',
        'USER'
      );
    end if;
  end if;

  return new;
end;
$$;

create trigger user_to_author_trigger 
AFTER INSERT ON auth.users
for each row execute function public.user_to_author_trigger();