-- This is added to show you my created table schema in my sql workbench

create table Users (
    user_id varchar(255) not null primary key,
    user_name varchar(255),
    user_email varchar(255) unique,
    password varchar(255),
    role varchar(255),
    created_at timestamp default current_timestamp
);

create table Products (
    product_id varchar(255) not null primary key,
    user_id varchar(255),
    product_name varchar(255),
    product_desc varchar(255),
    product_price bigint,
    is_approved boolean,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references Users (user_id)
)