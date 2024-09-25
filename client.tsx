import { hydrateRoot } from "react-dom/client";
import React from "react";
import { PostsSearch } from "./templates/components/posts-search";

hydrateRoot(document.getElementById("posts-search"), <PostsSearch />);
