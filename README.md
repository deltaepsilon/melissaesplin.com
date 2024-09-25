# Data extraction

See https://github.com/mysql2sqlite/mysql2sqlite

- Dump SQL from MySQL
    - `ssh 104.154.45.112`
    - `mysqldump --skip-extended-insert --user=chris --password wp > dump_mysql.sql`
    - `scp chris@104.154.45.112:~/dump_mysql.sql ./data`
    - `./lib/mysql2sqlite ./data/dump_mysql.sql | sqlite3 ./data/mysqlite3.db`
    - db name: `wp`
    - table prefix: `wp_`
    - db user: `chris`
    - db pass: `convent-district-pitiless`
- Open `data/mysqlite3.db` with https://libsqlstudio.com/playground/client`
