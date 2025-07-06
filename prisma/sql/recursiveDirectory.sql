WITH RECURSIVE directory AS ( SELECT * FROM "Folders" WHERE id= $1 UNION 
  SELECT f."id", f."name", f."parentId", f."ownerId" FROM "Folders" f INNER JOIN directory d ON d."parentId" = f."id" ) 
  SELECT "id", "name", "parentId" FROM directory