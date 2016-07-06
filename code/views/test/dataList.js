/**
 * Created by fengxiaofei on 2015/12/2.
 */
'use strict'
define([], function () {

    var testDataListModule = angular.module("testDataListModule", []);

    testDataListModule.controller('testDataListCtrl', function ($scope, $request, blockUI) {
        $scope.result = [{'Name': '安道尔', 'Code': 'AD', EnName: 'Andorra'},
            {'Name': '阿拉伯联合大公国', 'Code': 'AE', EnName: 'United Arab Emirates'},
            {'Name': '阿富汗', 'Code': 'AF', EnName: 'Afghanistan'},
            {'Name': '安提瓜和巴布达', 'Code': 'AG', EnName: 'Antigua And Barbuda'},
            {'Name': '安圭拉', 'Code': 'AI', EnName: 'Anguilla'},
            {'Name': '阿尔巴尼亚', 'Code': 'AL', EnName: 'Albania'},
            {'Name': '亚美尼亚', 'Code': 'AM', EnName: 'Armenia'},
            {'Name': '荷属安的列斯群岛', 'Code': 'AN', EnName: 'Netherlands Antilles'},
            {'Name': '安哥拉', 'Code': 'AO', EnName: 'Angola'},
            {'Name': '南极洲', 'Code': 'AQ', EnName: 'Antarctica'},
            {'Name': '阿根廷', 'Code': 'AR', EnName: 'Argentina'},
            {'Name': '萨摩亚(美国新界)', 'Code': 'AS', EnName: 'Samoa,Usa Territory'},
            {'Name': '奥地利', 'Code': 'AT', EnName: 'Austria'},
            {'Name': '澳大利亚', 'Code': 'AU', EnName: 'Australia'},
            {'Name': '雅卢巴', 'Code': 'AW', EnName: 'Aruba'},
            {'Name': '阿塞拜疆', 'Code': 'AZ', EnName: 'Azerbaijan'},
            {'Name': '波斯尼亚 - 黑塞哥维那', 'Code': 'BA', EnName: 'Bosnia And Herzegovina'},
            {'Name': '巴巴多斯', 'Code': 'BB', EnName: 'Barbados'},
            {'Name': '孟加拉', 'Code': 'BD', EnName: 'Bangladesh'},
            {'Name': '比利时', 'Code': 'BE', EnName: 'Belgium'},
            {'Name': '布基纳法索', 'Code': 'BF', EnName: 'Burkina Faso'},
            {'Name': '保加利亚', 'Code': 'BG', EnName: 'Bulgaria'},
            {'Name': '巴林', 'Code': 'BH', EnName: 'Bahrain'},
            {'Name': '布隆迪', 'Code': 'BI', EnName: 'Burundi'},
            {'Name': '贝宁', 'Code': 'BJ', EnName: 'Benin'},
            {'Name': '百慕大', 'Code': 'BM', EnName: 'Bermuda'},
            {'Name': '文莱', 'Code': 'BN', EnName: 'Brunei Darussalam'},
            {'Name': '玻利维亚', 'Code': 'BO', EnName: 'Bolivia'},
            {'Name': '巴西', 'Code': 'BR', EnName: 'Brazil'},
            {'Name': '巴哈马', 'Code': 'BS', EnName: 'Bahamas'},
            {'Name': '不丹', 'Code': 'BT', EnName: 'Bhutan'},
            {'Name': '布维岛', 'Code': 'BV', EnName: 'Bouvet Island'},
            {'Name': '博茨瓦纳', 'Code': 'BW', EnName: 'Botswana'},
            {'Name': '白俄罗斯', 'Code': 'BY', EnName: 'Belarus'},
            {'Name': '伯利兹', 'Code': 'BZ', EnName: 'Belize'},
            {'Name': '加拿大', 'Code': 'CA', EnName: 'Canada'},
            {'Name': '科科斯群岛', 'Code': 'CC', EnName: 'Cocos(keeling)islands'},
            {'Name': '刚果（民主共和国）', 'Code': 'CD', EnName: 'Congo (dem. Rep. Of)'},
            {'Name': '中非共和国', 'Code': 'CF', EnName: 'Central African Republic'},
            {'Name': '刚果', 'Code': 'CG', EnName: 'Congo (rep. Of)'},
            {'Name': '瑞士', 'Code': 'CH', EnName: 'Switzerland'},
            {'Name': '库克群岛', 'Code': 'CK', EnName: 'Cook Islands'},
            {'Name': '智利', 'Code': 'CL', EnName: 'Chile'},
            {'Name': '喀麦隆', 'Code': 'CM', EnName: 'Cameroon'},
            {'Name': '中国', 'Code': 'CN', EnName: 'China'},
            {'Name': '哥伦比亚', 'Code': 'CO', EnName: 'Colombia'},
            {'Name': '哥斯达黎加', 'Code': 'CR', EnName: 'Costa Rica'},
            {'Name': '古巴', 'Code': 'CU', EnName: 'Cuba'},
            {'Name': '佛得角群岛', 'Code': 'CV', EnName: 'Cape Verde'},
            {'Name': '圣诞岛', 'Code': 'CX', EnName: 'Christmas Island'},
            {'Name': '塞浦路斯', 'Code': 'CY', EnName: 'Cyprus'},
            {'Name': '捷克的', 'Code': 'CZ', EnName: 'Czech Republic'},
            {'Name': '德国', 'Code': 'DE', EnName: 'Germany'},
            {'Name': '吉布提', 'Code': 'DJ', EnName: 'Djibouti'},
            {'Name': '丹麦', 'Code': 'DK', EnName: 'Denmark'},
            {'Name': '多米尼加', 'Code': 'DM', EnName: 'Dominica'},
            {'Name': '多米尼加共和国', 'Code': 'DO', EnName: 'Dominican Republic'},
            {'Name': '阿尔及利亚', 'Code': 'DZ', EnName: 'Algeria'},
            {'Name': '厄瓜多尔', 'Code': 'EC', EnName: 'Ecuador'},
            {'Name': '爱沙尼亚', 'Code': 'EE', EnName: 'Estonia'},
            {'Name': '埃及', 'Code': 'EG', EnName: 'Egypt'},
            {'Name': '西撒哈拉', 'Code': 'EH', EnName: 'Western Sahara A)'},
            {'Name': '厄立特里亚', 'Code': 'ER', EnName: 'Eritrea'},
            {'Name': '西班牙', 'Code': 'ES', EnName: 'Spain'},
            {'Name': '埃塞俄比亚', 'Code': 'ET', EnName: 'Ethiopia'},
            {'Name': '芬兰', 'Code': 'FI', EnName: 'Finland'},
            {'Name': '斐济', 'Code': 'FJ', EnName: 'Fiji'},
            {'Name': '福克兰群岛', 'Code': 'FK', EnName: 'Falkland Island (malvinas)'},
            {'Name': '密克罗尼西亚', 'Code': 'FM', EnName: 'Micronesia (federated States Of)'},
            {'Name': '法罗群岛', 'Code': 'FO', EnName: 'Faroe Islands'},
            {'Name': '法国', 'Code': 'FR', EnName: 'France'},
            {'Name': '法国,大都会', 'Code': 'FX', EnName: 'FRANCE, METROPOLITAN'},
            {'Name': '另外薘', 'Code': 'GA', EnName: 'Gabon'},
            {'Name': '英国', 'Code': 'GB', EnName: 'United Kingdom'},
            {'Name': '格林纳达', 'Code': 'GD', EnName: 'Grenada'},
            {'Name': '格鲁吉亚', 'Code': 'GE', EnName: 'Georgia'},
            {'Name': '法属圭亚那', 'Code': 'GF', EnName: 'French Guiana'},
            {'Name': '加纳', 'Code': 'GH', EnName: 'Ghana'},
            {'Name': '直布罗陀', 'Code': 'GI', EnName: 'Gibraltar'},
            {'Name': '格陵兰', 'Code': 'GL', EnName: 'Greenland'},
            {'Name': '冈比亚', 'Code': 'GM', EnName: 'Gambia'},
            {'Name': '新几内亚', 'Code': 'GN', EnName: 'Guinea'},
            {'Name': '瓜德罗普岛', 'Code': 'GP', EnName: 'Guadeloupe'},
            {'Name': '赤道几内亚', 'Code': 'GQ', EnName: 'Equatorial Guinea'},
            {'Name': '希腊', 'Code': 'GR', EnName: 'Greece'},
            {'Name': '南乔治亚岛和南桑威奇群岛', 'Code': 'GS', EnName: 'South Georgia And The South Sandwich Isl'},
            {'Name': '危地马拉', 'Code': 'GT', EnName: 'Guatemala'},
            {'Name': '关岛', 'Code': 'GU', EnName: 'Guam'},
            {'Name': '几内亚比绍', 'Code': 'GW', EnName: 'Guinea-bissau'},
            {'Name': '圭亚那', 'Code': 'GY', EnName: 'Guyana'},
            {'Name': '香港', 'Code': 'HK', EnName: 'Hong Kong'},
            {'Name': '赫德岛和麦克唐纳岛', 'Code': 'HM', EnName: 'Heard Island And Mcdonald Islands'},
            {'Name': '洪都拉斯', 'Code': 'HN', EnName: 'Honduras'},
            {'Name': '克罗地亚', 'Code': 'HR', EnName: 'Croatia'},
            {'Name': '海地', 'Code': 'HT', EnName: 'Haiti'},
            {'Name': '匈牙利', 'Code': 'HU', EnName: 'Hungary'},
            {'Name': '印尼', 'Code': 'ID', EnName: 'Indonesia'},
            {'Name': '爱尔兰', 'Code': 'IE', EnName: 'Ireland'},
            {'Name': '以色列', 'Code': 'IL', EnName: 'Israel'},
            {'Name': '印度', 'Code': 'IN', EnName: 'India'},
            {'Name': '英属印度洋领地', 'Code': 'IO', EnName: 'British Indian Ocean Territory'},
            {'Name': '伊拉克', 'Code': 'IQ', EnName: 'Iraq'},
            {'Name': '伊朗', 'Code': 'IR', EnName: 'Iran (islamic Republic Of)'},
            {'Name': '冰岛', 'Code': 'IS', EnName: 'Iceland'},
            {'Name': '意大利', 'Code': 'IT', EnName: 'Italy'},
            {'Name': '牙买加', 'Code': 'JM', EnName: 'Jamaica'},
            {'Name': '约旦', 'Code': 'JO', EnName: 'Jordan'},
            {'Name': '日本', 'Code': 'JP', EnName: 'Japan'},
            {'Name': '肯尼亚', 'Code': 'KE', EnName: 'Kenya'},
            {'Name': '吉尔吉斯', 'Code': 'KG', EnName: 'Kyrgyzstan'},
            {'Name': '柬埔寨', 'Code': 'KH', EnName: 'Cambodia'},
            {'Name': '基里巴斯', 'Code': 'KI', EnName: 'Kiribati'},
            {'Name': '科摩罗', 'Code': 'KM', EnName: 'Comoros'},
            {'Name': '圣基茨和尼维斯', 'Code': 'KN', EnName: 'Saint Kitts And Nevis'},
            {'Name': '韩国', 'Code': 'KR', EnName: 'Korea'},
            {'Name': '科威特', 'Code': 'KW', EnName: 'Kuwait'},
            {'Name': '开曼群岛', 'Code': 'KY', EnName: 'Cayman Islands'},
            {'Name': '哈萨克斯坦', 'Code': 'KZ', EnName: 'Kazakhstan'},
            {'Name': '黎巴嫩', 'Code': 'LB', EnName: 'Lebanon'},
            {'Name': '圣卢西亚', 'Code': 'LC', EnName: 'Saint Lucia'},
            {'Name': '列支敦士登', 'Code': 'LI', EnName: 'Liechtenstein'},
            {'Name': '斯里兰卡', 'Code': 'LK', EnName: 'Sri Lanka'},
            {'Name': '利比里亚', 'Code': 'LR', EnName: 'Liberia'},
            {'Name': '莱索托', 'Code': 'LS', EnName: 'Lesotho'},
            {'Name': '立陶宛', 'Code': 'LT', EnName: 'Lithuania'},
            {'Name': '卢森堡', 'Code': 'LU', EnName: 'Luxembourg'},
            {'Name': '拉脱维亚', 'Code': 'LV', EnName: 'Latvia'},
            {'Name': '利比亚', 'Code': 'LY', EnName: 'Libyan Arab Jamahiriya'},
            {'Name': '摩洛哥', 'Code': 'MA', EnName: 'Morocco'},
            {'Name': '摩纳哥', 'Code': 'MC', EnName: 'Monaco'},
            {'Name': '摩尔多瓦', 'Code': 'MD', EnName: 'MOLDOVA, REPUBLIC OF'},
            {'Name': '黑山共和国', 'Code': 'ME', EnName: 'Montenegro'},
            {'Name': '马达加斯加', 'Code': 'MG', EnName: 'Madagascar'},
            {'Name': '马绍尔群岛', 'Code': 'MH', EnName: 'Marshall Islands'},
            {'Name': '马其顿', 'Code': 'MK', EnName: 'Macedonia (rep. Of) (former Yogoslavia)'},
            {'Name': '马里', 'Code': 'ML', EnName: 'Mali'},
            {'Name': '缅甸', 'Code': 'MM', EnName: 'Myanmar'},
            {'Name': '蒙古', 'Code': 'MN', EnName: 'Mongolia'},
            {'Name': '澳门', 'Code': 'MO', EnName: 'Macau'},
            {'Name': '马里亚纳群岛（北方）', 'Code': 'MP', EnName: 'Mariana Islands (northern)'},
            {'Name': '马提尼克岛', 'Code': 'MQ', EnName: 'Martinique'},
            {'Name': '毛里塔尼亚', 'Code': 'MR', EnName: 'Mauritania'},
            {'Name': '蒙特塞拉特', 'Code': 'MS', EnName: 'Montserrat'},
            {'Name': '马耳他', 'Code': 'MT', EnName: 'Malta'},
            {'Name': '毛里求斯', 'Code': 'MU', EnName: 'Mauritius'},
            {'Name': '马尔代夫', 'Code': 'MV', EnName: 'Maldives'},
            {'Name': '马拉维', 'Code': 'MW', EnName: 'Malawi'},
            {'Name': '墨西哥', 'Code': 'MX', EnName: 'Mexico'},
            {'Name': '马来西亚', 'Code': 'MY', EnName: 'Malaysia'},
            {'Name': '莫桑比克', 'Code': 'MZ', EnName: 'Mozambique'},
            {'Name': '纳米比亚', 'Code': 'NA', EnName: 'Namibia'},
            {'Name': '新喀里多尼亚', 'Code': 'NC', EnName: 'New Caledonia'},
            {'Name': '尼日尔', 'Code': 'NE', EnName: 'Niger'},
            {'Name': '无极褔克岛', 'Code': 'NF', EnName: 'Norfolk Island'},
            {'Name': '尼日利亚', 'Code': 'NG', EnName: 'Nigeria'},
            {'Name': '尼加拉瓜', 'Code': 'NI', EnName: 'Nicaragua'},
            {'Name': '荷兰', 'Code': 'NL', EnName: 'Netherlands'},
            {'Name': '挪威', 'Code': 'NO', EnName: 'Norway'},
            {'Name': '尼泊尔', 'Code': 'NP', EnName: 'Nepal'},
            {'Name': '瑙鲁', 'Code': 'NR', EnName: 'Nauru'},
            {'Name': '纽埃', 'Code': 'NU', EnName: 'Niue'},
            {'Name': '新西兰', 'Code': 'NZ', EnName: 'New Zealand'},
            {'Name': '阿曼', 'Code': 'OM', EnName: 'Oman'},
            {'Name': '巴拿马', 'Code': 'PA', EnName: 'Panama'},
            {'Name': '秘鲁', 'Code': 'PE', EnName: 'Peru'},
            {'Name': '法属波利尼西亚', 'Code': 'PF', EnName: 'French Polynesia'},
            {'Name': '巴布亚新几内亚', 'Code': 'PG', EnName: 'Papua New Guinea'},
            {'Name': '菲律宾', 'Code': 'PH', EnName: 'Philippines'},
            {'Name': '巴基斯坦', 'Code': 'PK', EnName: 'Pakistan'},
            {'Name': '波兰', 'Code': 'PL', EnName: 'Poland'},
            {'Name': '圣皮埃尔和密克隆', 'Code': 'PM', EnName: 'Saint Pierre And Miquelon'},
            {'Name': '皮特克恩岛', 'Code': 'PN', EnName: 'Pitcairn'},
            {'Name': '波多黎各', 'Code': 'PR', EnName: 'Puerto Rico'},
            {'Name': '葡萄牙', 'Code': 'PT', EnName: 'Portugal'},
            {'Name': '巴拉圭', 'Code': 'PY', EnName: 'Paraguay'},
            {'Name': '卡塔尔', 'Code': 'QA', EnName: 'Qatar'},
            {'Name': '留尼旺岛', 'Code': 'RE', EnName: 'Reunion'},
            {'Name': '罗马尼亚', 'Code': 'RO', EnName: 'Romania'},
            {'Name': '塞尔维亚', 'Code': 'RS', EnName: 'Serbia'},
            {'Name': '俄罗斯', 'Code': 'RU', EnName: 'Russian Federation'},
            {'Name': '卢旺达', 'Code': 'RW', EnName: 'Rwanda'},
            {'Name': '沙特阿拉伯', 'Code': 'SA', EnName: 'Saudi Arabia'},
            {'Name': '索罗门群岛', 'Code': 'SB', EnName: 'Solomon Islands'},
            {'Name': '塞舌尔', 'Code': 'SC', EnName: 'Seychelles'},
            {'Name': '苏丹', 'Code': 'SD', EnName: 'Sudan'},
            {'Name': '瑞典', 'Code': 'SE', EnName: 'Sweden'},
            {'Name': '新加坡', 'Code': 'SG', EnName: 'Singapore'},
            {'Name': '圣赫勒拿岛', 'Code': 'SH', EnName: 'Saint Helena'},
            {'Name': '斯洛文尼亚', 'Code': 'SI', EnName: 'Slovenia'},
            {'Name': '斯匹次卑尔根群岛', 'Code': 'SJ', EnName: 'Spitsbergen(svalbard)'},
            {'Name': '斯洛伐克', 'Code': 'SK', EnName: 'Slovak Republic'},
            {'Name': '塞拉利昂', 'Code': 'SL', EnName: 'Sierra Leone'},
            {'Name': '圣马力诺', 'Code': 'SM', EnName: 'San Marino'},
            {'Name': '塞内加尔', 'Code': 'SN', EnName: 'Senegal'},
            {'Name': '索马里', 'Code': 'SO', EnName: 'Somalia'},
            {'Name': '苏里南', 'Code': 'SR', EnName: 'Suriname'},
            {'Name': '圣多美和普林西比', 'Code': 'ST', EnName: 'Sao Tome And Principe'},
            {'Name': '萨尔瓦多', 'Code': 'SV', EnName: 'El Salvador'},
            {'Name': '阿拉伯叙利亚共和国（叙利亚）', 'Code': 'SY', EnName: 'Syrian Arab Republic'},
            {'Name': '斯威士兰', 'Code': 'SZ', EnName: 'Swaziland'},
            {'Name': '特克斯和凯科斯群岛', 'Code': 'TC', EnName: 'Turks And Caicos Islands'},
            {'Name': '乍得', 'Code': 'TD', EnName: 'Chad'},
            {'Name': '法国南部地区', 'Code': 'TF', EnName: 'French Southern Territories'},
            {'Name': '多哥', 'Code': 'TG', EnName: 'Togo'},
            {'Name': '泰国', 'Code': 'TH', EnName: 'Thailand'},
            {'Name': '塔吉克', 'Code': 'TJ', EnName: 'Tajikistan'},
            {'Name': '托克劳', 'Code': 'TK', EnName: 'Tokelau'},
            {'Name': '土库曼', 'Code': 'TM', EnName: 'Turkmenistan'},
            {'Name': '突尼斯', 'Code': 'TN', EnName: 'Tunisia'},
            {'Name': '汤加', 'Code': 'TO', EnName: 'Tonga'},
            {'Name': '东帝汶', 'Code': 'TP', EnName: 'East Timor A)'},
            {'Name': '土耳其', 'Code': 'TR', EnName: 'Turkey'},
            {'Name': '特里尼达和多巴哥', 'Code': 'TT', EnName: 'Trinidad And Tobago'},
            {'Name': '图瓦卢', 'Code': 'TV', EnName: 'Tuvalu'},
            {'Name': '台湾', 'Code': 'TW', EnName: 'Taiwan'},
            {'Name': '坦桑尼亚', 'Code': 'TZ', EnName: 'Tanzania'},
            {'Name': '乌克兰', 'Code': 'UA', EnName: 'Ukraine'},
            {'Name': '乌干达', 'Code': 'UG', EnName: 'Uganda'},
            {'Name': '美国本土外小岛屿', 'Code': 'UM', EnName: 'United States Minor Outlying Islands'},
            {'Name': '美国', 'Code': 'US', EnName: 'United States'},
            {'Name': '乌拉圭', 'Code': 'UY', EnName: 'Uruguay'},
            {'Name': '乌兹别克', 'Code': 'UZ', EnName: 'Uzbekistan'},
            {'Name': '教廷', 'Code': 'VA', EnName: 'Vatican City State (holy See)'},
            {'Name': '圣文森特和格林纳丁斯', 'Code': 'VC', EnName: 'Saint Vincent And The Grenadines'},
            {'Name': '委内瑞拉', 'Code': 'VE', EnName: 'Venezuela'},
            {'Name': '英属维尔京群岛（英属维尔京群岛）', 'Code': 'VG', EnName: 'Tortola (british Virgin Islands)'},
            {'Name': '美国美属维尔京群岛', 'Code': 'VI', EnName: 'Virgin Islands (u.s.)'},
            {'Name': '越南', 'Code': 'VN', EnName: 'Viet Nam'},
            {'Name': '瓦努阿图', 'Code': 'VU', EnName: 'Vanuatu'},
            {'Name': '瓦利斯群岛和富图纳群岛', 'Code': 'WF', EnName: 'Wallis And Futuna Islands'},
            {'Name': '西萨摩亚', 'Code': 'WS', EnName: 'SAMOA, WESTERN'},
            {'Name': '加那利群岛', 'Code': 'XA', EnName: 'Canary Islands'},
            {'Name': '特里斯坦 - 达库尼亚岛', 'Code': 'XB', EnName: 'Tristan Da Cunha'},
            {'Name': '海峡群岛', 'Code': 'XC', EnName: 'Channel Islands'},
            {'Name': '上升', 'Code': 'XD', EnName: 'Ascension'},
            {'Name': '加沙地带汗尤尼斯', 'Code': 'XE', EnName: 'Gaza And Khan Yunis'},
            {'Name': '科西嘉岛', 'Code': 'XF', EnName: 'Corsica'},
            {'Name': '北非，西班牙属土', 'Code': 'XG', EnName: 'Spanish Territories Of N. Africa'},
            {'Name': '亚速尔群岛', 'Code': 'XH', EnName: 'Azores'},
            {'Name': '马德拉', 'Code': 'XI', EnName: 'Madeira'},
            {'Name': '巴利阿里群岛', 'Code': 'XJ', EnName: 'Balearic Islands'},
            {'Name': '加罗林群岛', 'Code': 'XK', EnName: 'Caroline Islands'},
            {'Name': '属土群岛（库克群岛）在新西兰', 'Code': 'XL', EnName: 'New Zealand Islands Territories'},
            {'Name': '威克岛', 'Code': 'XM', EnName: 'Wake Island'},
            {'Name': '科索沃', 'Code': 'XO', EnName: 'Kosovo'},
            {'Name': '也门', 'Code': 'YE', EnName: 'Yemen (republic Of)'},
            {'Name': '马约特岛', 'Code': 'YT', EnName: 'Mayotte'},
            {'Name': '南非', 'Code': 'ZA', EnName: 'South Africa'},
            {'Name': '赞比亚', 'Code': 'ZM', EnName: 'Zambia'},
            {'Name': '津巴布韦', 'Code': 'ZW', EnName: 'Zimbabwe'}];
        $scope.init = function () {
            $scope.nameData = [];
            angular.forEach($scope.result, function (n) {
                $scope.nameData.push(n.Name);
            })
        }
        $scope.init();

    });
})