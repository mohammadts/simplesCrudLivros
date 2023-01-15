# simplesCrudLivros

CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `pageqty` int(11) DEFAULT NULL,
  `language` varchar(45) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `publisher` varchar(45) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `isbn_13` varchar(45) DEFAULT NULL,
  `isbn_10` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn_13_UNIQUE` (`isbn_13`),
  UNIQUE KEY `isbn_10_UNIQUE` (`isbn_10`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1
