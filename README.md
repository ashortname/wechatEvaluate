# wechatEvaluate
简易微信学生评教小程序  
程序做的简陋，但基本功能都有了。


# 数据库各表结构  

-- ----------------------------  
-- Table structure for courInfo  
-- ----------------------------  
DROP TABLE IF EXISTS `courInfo`;  
CREATE TABLE `courInfo`  (  
  `courName` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `courID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  INDEX `courID`(`courID`) USING BTREE,  
  INDEX `courName`(`courName`) USING BTREE  
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;  

-- ----------------------------  
-- Table structure for pj  
-- ----------------------------  
DROP TABLE IF EXISTS `pj`;  
CREATE TABLE `pj`  (  
  `stuID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `tchID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `courID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `checked` int(1) NULL DEFAULT 0,  
  `score` int(3) NULL DEFAULT 0,  
  `comment` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ' ',  
  INDEX `tch`(`tchID`) USING BTREE,  
  INDEX `cour`(`courID`) USING BTREE  
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;  
 
-- ----------------------------  
-- Table structure for rstCode  
-- ----------------------------  
DROP TABLE IF EXISTS `rstCode`;  
CREATE TABLE `rstCode`  (  
  `id` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,  
  `code` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `ctime` datetime(0) NULL DEFAULT NULL,  
  PRIMARY KEY (`id`) USING BTREE  
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;  
  
-- ----------------------------  
-- Table structure for stuInfo  
-- ----------------------------  
DROP TABLE IF EXISTS `stuInfo`;  
CREATE TABLE `stuInfo`  (  
  `stuName` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `stuID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,  
  `stuPWD` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `stuSex` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `stuClass` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `stuAge` tinyint(3) NULL DEFAULT NULL,  
  PRIMARY KEY (`stuID`) USING BTREE  
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;  
  
-- ----------------------------  
-- Table structure for tchInfo  
-- ----------------------------  
DROP TABLE IF EXISTS `tchInfo`;  
CREATE TABLE `tchInfo`  (  
  `tchName` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `tchID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `tchPWD` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `tchAge` tinyint(3) NULL DEFAULT NULL,  
  `tchSex` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `tchZW` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  INDEX `tchID`(`tchID`) USING BTREE,  
  INDEX `tchName`(`tchName`) USING BTREE  
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;  
 
-- ----------------------------  
-- Table structure for teach  
-- ----------------------------  
DROP TABLE IF EXISTS `teach`;  
CREATE TABLE `teach`  (  
  `tchID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,  
  `tchName` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `courID` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  `courName` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,  
  PRIMARY KEY (`tchID`) USING BTREE,  
  INDEX `tname`(`tchName`) USING BTREE,  
  INDEX `cname`(`courName`) USING BTREE,  
  INDEX `cid`(`courID`) USING BTREE,  
  CONSTRAINT `cid` FOREIGN KEY (`courID`) REFERENCES `courInfo` (`courID`) ON DELETE CASCADE ON UPDATE CASCADE,  
  CONSTRAINT `cname` FOREIGN KEY (`courName`) REFERENCES `courInfo` (`courName`) ON DELETE CASCADE ON UPDATE CASCADE,  
  CONSTRAINT `tid` FOREIGN KEY (`tchID`) REFERENCES `tchInfo` (`tchID`) ON DELETE CASCADE ON UPDATE CASCADE,  
  CONSTRAINT `tname` FOREIGN KEY (`tchName`) REFERENCES `tchInfo` (`tchName`) ON DELETE CASCADE ON UPDATE CASCADE  
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;  
  
-- ----------------------------  
-- Event structure for event1  
-- ----------------------------  
DROP EVENT IF EXISTS `event1`;  
delimiter ;;  
CREATE DEFINER = `root`@`%` EVENT `event1`  
ON SCHEDULE  
EVERY '360' SECOND STARTS '2019-06-24 18:54:28'  
DO delete from rstCode where TIMESTAMPDIFF(minute, rstCode.ctime, now()) > 35  
;;  
delimiter ;  

SET FOREIGN_KEY_CHECKS = 1;
