-- backend/src/main/resources/data.sql
-- Users
INSERT INTO USER (name, email, avatar) VALUES ('John Doe', 'john@example.com', '/assets/avatars/john.jpg');
INSERT INTO USER (name, email, avatar) VALUES ('Jane Smith', 'jane@example.com', '/assets/avatars/jane.jpg');
INSERT INTO USER (name, email, avatar) VALUES ('Robert Brown', 'robert@example.com', '/assets/avatars/robert.jpg');
INSERT INTO USER (name, email, avatar) VALUES ('Emily Davis', 'emily@example.com', '/assets/avatars/emily.jpg');

-- Tasks
INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('Daily UI Mails for Tasks', 'Check and respond to UI-related emails for current tasks', false, '2025-04-20T10:00:00', 'Design', 1);

INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('Hotspot Tour Today', 'Conduct tour of new hotspot features for the team', false, '2025-04-15T14:00:00', 'Meetings', 2);

INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('Onefoc Sprint Day', 'Sprint planning and review for Onefoc project', false, '2025-04-17T09:00:00', 'Planning', 3);

INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('Buy Clean Tape', 'Purchase cleaning supplies for office maintenance', false, '2025-04-16T16:00:00', 'Office', 4);

INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('Calendar Manager', 'Update and optimize the calendar management system', false, '2025-04-19T11:00:00', 'Development', 3);

INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('Team Core Vision', 'Define and document the core vision for the team', false, '2025-04-22T13:00:00', 'Strategy', 1);

INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('Ganabedder Audio End Grays', 'Finalize audio settings for the Ganabedder project', false, '2025-04-18T15:30:00', 'Audio', 2);

INSERT INTO TASK (title, description, completed, due_date, category, assignee_id) 
VALUES ('File for Content Review', 'Submit content for review according to guidelines', false, '2025-04-21T10:00:00', 'Content', 4);
