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

# Data storage

Take the contents of `\\Stego\Chris\Web\MelissaEsplin.com\data` and drop it into `/data`.

This includes a MySql dump, a SQLite db with the contents of MySql, and a copy of the images from wp-content.

There should also be a `wp.tar.gz` archive of the `wp` folder. This is everything necessary to run the WP site.

It was created with the following steps:

- Call `mount_synology` to mount the NAS

```bash
mount_synology() {
    sudo mkdir -p /synology/stego/homes
    sudo mkdir -p /synology/stego/chris
    sudo mount -t nfs 192.168.86.50:/volume1/homes /synology/stego/homes
    sudo mount -t nfs 192.168.86.50:/volume1/Chris /synology/stego/chris
}
```

- `scp 162.222.177.51:/home/chris/wp.tar.gz /synology/stego/chris/Web/MelissaEsplin.com/`
