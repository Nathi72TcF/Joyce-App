import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../Service/wordpress.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  post: any;

  constructor(
      private route: ActivatedRoute,
      private wp: WordpressService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostContent(id).subscribe(res => {
      this.post = res;
    })
  }

  openOriginal() {
    // Add InAppBrowser for app if want
    window.open(this.post.link, '_blank');
  }

}
