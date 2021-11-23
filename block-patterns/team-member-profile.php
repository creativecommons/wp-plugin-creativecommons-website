<?php

function register_team_member_profile()
{
    
    wp_enqueue_style(
        'CC team members',
        plugins_url('../styles/team-members.css', __FILE__),
        filemtime(plugin_dir_path(__FILE__) .'../'.'styles/team-members.css')
    );
    register_block_pattern_category('CC Blocks', array('label' => _x('CC Blocks', 'Block pattern category', 'textdomain')));
    register_block_pattern(
        'common/team-member-profile',
        array(
            'title'       => __('Team Member Profile', 'common'),
            'description' => _x('An image, the user name and desgin nation below it, followed by the user bio.', 'Block pattern description', 'common'),
            "categories"    => array('CC Blocks'),
            'content'     => "<!-- wp:image {\"id\":11,\"sizeSlug\":\"full\",\"linkDestination\":\"none\"} -->\n<figure class=\"wp-block-image size-full\"><img src=\"http://0.gravatar.com/avatar/64da557d42a678261d327bac4dfd7162?s=150&d=mm&r=g\" alt=\"\" class=\"wp-image-11\"/></figure>\n<!-- /wp:image -->\n\n<!-- wp:paragraph {\"style\":{\"typography\":{\"fontSize\":\"24px\"}}} -->\n<p class=\"team_member_username\" style=\"font-size:24px\"><strong><span style=\"color:#c74200\" class=\"has-inline-color\">Julia Brungs</span></strong></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"fontSize\":\"small\"} -->\n<p class=\"team_member_position has-small-font-size\"><strong>Network manager</strong></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"fontSize\":\"normal\"} -->\n<p class=\"has-normal-font-size\">Sed aliquam volutpat tincidunt commodo tristique vitae, aliquet neque. Pretium ultrices ipsum aliquam nisi.</p>\n<!-- /wp:paragraph -->",
        )
    );
};

add_action('init', 'register_team_member_profile');
