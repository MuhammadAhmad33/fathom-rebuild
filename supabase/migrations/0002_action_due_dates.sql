alter table action_items add column if not exists due_date date;

update action_items set due_date = case position
  when 1 then date '2026-09-21'
  when 2 then date '2026-09-22'
  when 3 then date '2026-09-23'
  when 4 then date '2026-09-26'
end
where due_date is null;
